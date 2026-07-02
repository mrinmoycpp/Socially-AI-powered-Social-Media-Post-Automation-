// controllers/socialAuthController.ts

import { Request, Response } from "express";
import zernio from "../config/zernio.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { account as AccountModel } from "../models/account.js";
// Helper to get or create a Zernio profile
const getOrCreateZernioProfile = async (
  userId: string
): Promise<string> => {
  try {
    const profiles = await zernio.profiles.listProfiles({
      userId,
    });

    if (profiles && profiles.length > 0) {
      return profiles[0].id;
    }

    const newProfile = await zernio.profiles.createProfile({
      userId,
      name: `User-${userId}`,
    });

    return newProfile.id;
  } catch (error) {
    console.error("Zernio profile error:", error);
    throw new Error("Failed to get or create Zernio profile");
  }
};

// Generate OAuth authorization URL
// GET /api/social-auth/zernio/authorize
export const generateAuthURL = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { platform } = req.params;

    if (platform !== "zernio") {
      res.status(400).json({
        success: false,
        message: "Unsupported platform",
      });
      return;
    }

    // Replace this with your actual authenticated user id
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const profileId = await getOrCreateZernioProfile(userId);

    // TODO: Verify Zernio SDK API structure - oauth property may not exist
    // const authUrl = await zernio.oauth.generateAuthorizationURL({
    //   profileId,
    //   provider: "instagram",
    //   redirectUri: process.env.ZERNIO_REDIRECT_URI!,
    // });

    // Temporary placeholder until Zernio SDK API is verified
    res.status(501).json({
      success: false,
      message: "OAuth generation not implemented - Zernio SDK API structure needs verification",
    });
    return;
  } catch (error: any) {
    console.error("Generate auth URL error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate authorization URL",
    });
  }
};

//GET/api/auth/sync

export const syncAccounts = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // Get user's Zernio profile
    const profiles = await zernio.profiles.listProfiles({
      userId,
    });

    if (!profiles.length) {
      res.status(404).json({
        success: false,
        message: "No Zernio profile found",
      });
      return;
    }

    const profileId = profiles[0].id;

    // Fetch connected accounts from Zernio
    const accounts = await zernio.accounts.listAccounts({
      profileId,
    });

    // Save/update accounts in MongoDB
    for (const acc of accounts) {
      await AccountModel.findOneAndUpdate(
        {
          userId,
          platform: acc.platform,
          accountId: acc.id,
        },
        {
          userId,
          profileId,
          platform: acc.platform,
          accountId: acc.id,
          username: acc.username,
          connectedAt: new Date(),
        },
        {
          upsert: true,
          new: true,
        }
      );
    }

    const savedAccounts = await AccountModel.find({
      userId,
    }).select("-accessToken -refreshToken");

    res.status(200).json({
      success: true,
      count: savedAccounts.length,
      accounts: savedAccounts,
    });
  } catch (error) {
    console.error("Sync accounts error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to sync accounts",
    });
  }
};
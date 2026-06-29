import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-20" style={{ background: "#ffffff" }}>
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <div
                    className="relative rounded-3xl overflow-hidden p-14 sm:p-20 text-center"
                    style={{
                        background: "linear-gradient(145deg, #dbeafe 0%, #eff6ff 100%)",
                        border: "1.5px solid rgba(239,68,68,0.12)",
                    }}
                >


                    <div className="relative">
                        <div className="mb-6 inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/15 text-blue-500 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">Ready to grow?</div>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight font-medium text-gray-900">
                            Automate your social
                            <br />
                            <span className="text-blue-400 italic">media today</span>
                        </h2>
                        <p className="mt-6 text-gray-500 max-w-lg mx-auto  text-lg">Join thousands of creators and marketers who trust Scheduler to grow their audience on autopilot.</p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link to="/login" className="bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 hover:shadow-[0_8px_24px_rgba(239,68,68,0.35)] inline-flex items-center gap-2 text-[15px] px-10 py-4 w-full sm:w-auto justify-center">
                                Get Started Free <ArrowRightIcon className="size-4" />
                            </Link>
            
                        </div>

                        <p className="mt-6 text-xs text-gray-400">No credit card required · Cancel anytime</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

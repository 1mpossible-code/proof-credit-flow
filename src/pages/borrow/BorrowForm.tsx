import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Eye, Sparkles, ArrowRight } from "lucide-react";

const BorrowForm = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("10000");
  const [collateral, setCollateral] = useState("5000");
  const [maxApr, setMaxApr] = useState(8);
  const [duration, setDuration] = useState("14");
  const [requestMode, setRequestMode] = useState<"until_filled" | "deadline">("until_filled");
  const [allowPartial, setAllowPartial] = useState(true);
  const [showProofModal, setShowProofModal] = useState(false);

  const applyDefaults = () => {
    setMaxApr(7.5);
    setDuration("14");
    setCollateral("5500");
  };

  const riskTier = "Low";
  const proofBadges = ["Income Verified", "Stability Verified", "Tenure Verified"];

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-2xl mx-auto">
        {/* Risk Banner */}
        <div className="glow-card glow-card-active p-6 mb-8 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Risk Tier</p>
              <span className="badge-low text-sm font-semibold px-3 py-1 rounded-full">{riskTier}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {proofBadges.map((b) => (
                <span key={b} className="flex items-center gap-1 text-xs bg-secondary px-3 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3 text-success" />
                  {b}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowProofModal(true)}
            className="mt-4 text-sm text-primary flex items-center gap-1 hover:underline"
          >
            <Eye className="w-4 h-4" /> View what lenders see
          </button>
        </div>

        {/* Loan Form */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h2 className="font-heading text-2xl font-bold">Loan Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Amount Requested (USDC)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Collateral Deposit (USDC)</label>
              <input
                type="number"
                value={collateral}
                onChange={(e) => setCollateral(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Max APR Willing to Pay: <span className="text-primary font-semibold">{maxApr}%</span>
            </label>
            <input
              type="range"
              min={1}
              max={20}
              step={0.1}
              value={maxApr}
              onChange={(e) => setMaxApr(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition"
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* Request Mode */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Request Mode</p>
            <div className="space-y-3">
              <label className={`glow-card p-4 flex items-start gap-3 cursor-pointer ${requestMode === "until_filled" ? "glow-card-active" : ""}`}>
                <input
                  type="radio"
                  name="mode"
                  checked={requestMode === "until_filled"}
                  onChange={() => setRequestMode("until_filled")}
                  className="mt-1 accent-primary"
                />
                <div>
                  <p className="font-medium text-sm">Until Fully Filled</p>
                  <p className="text-xs text-muted-foreground">Keep listing until full amount is matched.</p>
                </div>
              </label>
              <label className={`glow-card p-4 flex items-start gap-3 cursor-pointer ${requestMode === "deadline" ? "glow-card-active" : ""}`}>
                <input
                  type="radio"
                  name="mode"
                  checked={requestMode === "deadline"}
                  onChange={() => setRequestMode("deadline")}
                  className="mt-1 accent-primary"
                />
                <div>
                  <p className="font-medium text-sm">By Deadline</p>
                  <p className="text-xs text-muted-foreground">Set a deadline. Cancel if not fully filled.</p>
                </div>
              </label>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={allowPartial}
              onChange={(e) => setAllowPartial(e.target.checked)}
              className="accent-primary"
            />
            Allow Partial Fills
          </label>

          {/* AI Suggestion */}
          <div className="glow-card glow-card-active p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-semibold">AI Suggested Terms</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">APR Range</p>
                <p className="font-semibold">6.8% – 8.2%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Duration</p>
                <p className="font-semibold">14 days</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Collateral</p>
                <p className="font-semibold">$5,500</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Based on verified income stability and risk band.</p>
            <button onClick={applyDefaults} className="glow-button-outline text-sm px-4 py-2">
              Apply Suggested Terms
            </button>
          </div>

          <button
            onClick={() => navigate("/borrow/confirm")}
            className="glow-button w-full flex items-center justify-center gap-2"
          >
            Preview & List Request
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Proof Modal */}
        {showProofModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowProofModal(false)}>
            <div className="glow-card glow-card-active p-8 max-w-md w-full mx-4 animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-heading text-xl font-bold mb-4">What Lenders See</h3>
              <p className="text-sm text-muted-foreground mb-4">Lenders only see verified proof badges and your risk tier — never your raw documents.</p>
              <div className="space-y-2 mb-6">
                <span className="badge-low text-sm font-semibold px-3 py-1 rounded-full inline-block">Risk: {riskTier}</span>
                {proofBadges.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success" />
                    {b}
                  </div>
                ))}
              </div>
              <button onClick={() => setShowProofModal(false)} className="glow-button-outline w-full text-sm">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowForm;

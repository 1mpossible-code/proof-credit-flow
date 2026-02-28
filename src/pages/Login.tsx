import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Wallet, Shield, ArrowRight } from "lucide-react";

const Login = () => {
  const { connected, connect } = useWallet();
  const navigate = useNavigate();

  const handleConnect = () => {
    if (connected) {
      navigate("/select");
    } else {
      connect();
      setTimeout(() => navigate("/select"), 300);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-2xl w-full animate-fade-in">
        {/* Connect Wallet Section */}
        <div className="text-center mb-12">
          <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-primary">ProofCredit</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Connect your wallet to access the marketplace.
          </p>

          <button onClick={handleConnect} className="glow-button text-lg px-8 py-4 flex items-center gap-3 mx-auto">
            <Wallet className="w-5 h-5" />
            {connected ? "Enter App" : "Connect Wallet"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm font-medium">Our Mission</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Mission Statement */}
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Traditional DeFi lending is broken. Nearly every protocol today demands{" "}
            <span className="text-foreground font-medium">150–200% overcollateralization</span> — locking up more value
            than you borrow. This shuts out the vast majority of real-world borrowers who need
            capital the most, turning DeFi into a playground for whales instead of a financial tool
            for everyone.
          </p>

          <p>
            <span className="text-primary font-semibold">ProofCredit changes that.</span> We're
            building the first truly undercollateralized lending marketplace on-chain, powered by
            zero-knowledge proofs and private credit verification. Your income, employment, and
            creditworthiness are verified without ever exposing your raw data — not to lenders, not
            to the protocol, not to anyone.
          </p>

          <p>
            By combining{" "}
            <span className="text-foreground font-medium">Monad's high-performance execution</span>{" "}
            with{" "}
            <span className="text-foreground font-medium">Unlink's private state infrastructure</span>,
            we enable a new class of credit markets: ones where trust is established through cryptographic
            proof rather than excessive collateral. Borrowers access fair terms, lenders get intelligent
            risk assessment, and the entire process is transparent, composable, and programmable.
          </p>

          <p>
            Our vision is a world where on-chain credit works like it should — accessible,
            private, and efficient. No gatekeepers. No data exposure. Just verifiable trust.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 pb-12">
          <button onClick={handleConnect} className="glow-button-outline text-sm px-6 py-3 flex items-center gap-2 mx-auto">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

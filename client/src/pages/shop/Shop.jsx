import { useState } from "react";
import {
  Coins,
  Sparkles,
  Lock,
  Zap,
  Gamepad2,
  CheckCircle2,
  ArrowRight,
  Gift,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";

function Shop() {
  const { coinpack, purchasepack } = useShop();
  const { user } = useAuth();
  const [purchasingId, setPurchasingId] = useState(null);
  const [justBoughtId, setJustBoughtId] = useState(null);

  const handlePurchase = async (packId) => {
    if (purchasingId) return;
    setPurchasingId(packId);
    try {
      await purchasepack(packId);
      setJustBoughtId(packId);
      setTimeout(() => {
        setJustBoughtId((prev) => (prev === packId ? null : prev));
      }, 2000);
    } finally {
      setPurchasingId(null);
    }
  };

  const formattedBalance =
    typeof user?.coins === "number"
      ? user.coins.toLocaleString("en-IN")
      : "2,450";

  return (
    <div
      style={{
        background: "var(--main-background)",
        color: "var(--primary-text-color)",
        fontFamily: "var(--font-family)",
      }}
      className="min-h-screen px-4 sm:px-[6%] py-12 transition-colors duration-300 relative overflow-x-hidden"
    >
      {/* Subtle Top Ambient Glow */}
      <div
        style={{ backgroundColor: "var(--secondary-text-color)" }}
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[520px] h-56 rounded-full opacity-10 blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ================= HEADER & WALLET ================= */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          <div className="space-y-2.5">
            <div
              style={{
                backgroundColor: "var(--subcard-bg)",
                borderColor: "var(--border-color)",
                color: "var(--secondary-text-color)",
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-orbitron font-bold tracking-[0.22em] uppercase backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>PlayVerse Storefront</span>
            </div>

            <h1 className="font-orbitron text-3xl sm:text-5xl font-black tracking-tight leading-none">
              Gold{" "}
              <span style={{ color: "var(--secondary-text-color)" }}>
                Coins
              </span>
            </h1>

            <p
              style={{ color: "var(--text)" }}
              className="text-sm sm:text-base max-w-xl leading-relaxed"
            >
              Power up your wallet with instant coin bundles, unlock extra bonus
              coins, and jump straight into competitive matches.
            </p>
          </div>

          {/* Wallet Balance Card */}
          <div
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border-color)",
            }}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-xl self-start md:self-auto shrink-0"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300/20 to-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <span
                style={{ color: "var(--text)" }}
                className="block text-[10px] font-bold tracking-[0.2em] uppercase"
              >
                Current Balance
              </span>
              <span className="font-orbitron text-2xl font-black text-amber-300 tracking-tight">
                {formattedBalance}{" "}
                <span className="text-xs font-bold text-amber-200/75">
                  GC
                </span>
              </span>
            </div>
          </div>
        </header>

        {/* ================= COIN PACKS GRID ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">
          {coinpack?.map((pack) => {
            const isBuying = purchasingId === pack.id;
            const isBought = justBoughtId === pack.id;

            return (
              <article
                key={pack.id}
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: pack.popular
                    ? "var(--secondary-text-color)"
                    : "var(--border-color)",
                }}
                className={`group relative rounded-3xl border backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  pack.popular ? "ring-1 ring-white/15 shadow-lg" : ""
                }`}
              >
                {/* Top Popular Ribbon Pill */}
                {pack.popular && (
                  <div
                    style={{
                      backgroundColor: "var(--btn)",
                      color: "var(--btn-text, #FFFFFF)",
                    }}
                    className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-orbitron text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase shadow-md"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Friend Favorite</span>
                  </div>
                )}

                {/* Full-Visible Centered Artwork Showcase */}
                <div
                  style={{ backgroundColor: "var(--subcard-bg)" }}
                  className="relative h-44 sm:h-56 p-4 sm:p-5 flex items-center justify-center overflow-hidden border-b border-white/[0.06]"
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-28 h-28 rounded-full bg-amber-400/15 blur-2xl group-hover:scale-125 transition-transform duration-500" />
                  </div>

                  <img
                    src={pack.image}
                    alt={`${pack.coins} gold coins`}
                    className="relative z-10 w-full h-full object-contain object-center drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Pack Info & Price CTA */}
                <div className="p-4 sm:p-6 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-orbitron text-xl sm:text-2xl font-black tracking-tight">
                        {Number(pack.coins).toLocaleString("en-IN")}
                      </span>
                      <span
                        style={{ color: "var(--text)" }}
                        className="font-orbitron text-[10px] sm:text-xs font-extrabold uppercase tracking-wider"
                      >
                        GC
                      </span>
                    </div>

                    {pack.bonus && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 font-orbitron text-[9px] sm:text-[10px] font-extrabold tracking-wide uppercase whitespace-nowrap">
                        <Gift className="w-3 h-3" />+{pack.bonus} Bonus
                      </span>
                    )}
                  </div>

                  {/* Modern Purchase Button */}
                  <button
                    type="button"
                    disabled={isBuying}
                    onClick={() => handlePurchase(pack.id)}
                    className={`group/btn w-full py-3 sm:py-3.5 px-4 rounded-2xl font-orbitron text-xs sm:text-sm font-black tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md ${
                      isBought
                        ? "bg-emerald-500 text-zinc-950"
                        : "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:brightness-110 active:scale-[0.98] text-zinc-950"
                    } disabled:opacity-60`}
                  >
                    {isBought ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>COINS ADDED</span>
                      </>
                    ) : isBuying ? (
                      <span className="animate-pulse">PROCESSING...</span>
                    ) : (
                      <>
                        <span>₹{pack.price}</span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider opacity-85">
                          • Buy Now
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* ================= TRUST & PERKS STRIP ================= */}
        <footer
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            color: "var(--text)",
          }}
          className="mt-12 px-6 py-4 rounded-2xl border backdrop-blur-md flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-8 text-xs font-medium"
        >
          <span className="inline-flex items-center gap-2">
            <Lock
              style={{ color: "var(--secondary-text-color)" }}
              className="w-4 h-4 shrink-0"
            />
            <span>Secure Payments</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Zap
              style={{ color: "var(--secondary-text-color)" }}
              className="w-4 h-4 shrink-0"
            />
            <span>Instant Coin Delivery</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Gamepad2
              style={{ color: "var(--secondary-text-color)" }}
              className="w-4 h-4 shrink-0"
            />
            <span>Ready For Ranked & Casual</span>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default Shop;
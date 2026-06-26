import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownLeft, Banknote, DollarSign, Filter, X, CheckCircle2, BanknoteIcon, ChevronDown, Send } from "lucide-react";
import { dashboardApi, userApi, walletApi } from "../../services/api";
import useAuthStore from "../../store/authStore";
import useWalletStore from "../../store/walletStore";
import { Card, Skeleton, Badge, Button, Modal, Input } from "../../components/common";

const formatNaira = (amount) => "₦" + Math.abs(amount || 0).toLocaleString("en-NG");
const formatUSD = (amount) => "$" + Math.abs(amount || 0).toLocaleString("en-US");
const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "--";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Deposits", value: "deposit" },
  { label: "Withdrawals", value: "withdrawal" },
  { label: "Investments", value: "investment" },
  { label: "Returns", value: "return" },
];

function DepositModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await walletApi.fundWallet(Number(amount));
      setStep("confirmation");
    } catch (err) {
      setError(err.message || "Deposit failed");
    } finally { setLoading(false); }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={step === "form" ? "Fund Wallet" : "Deposit Instructions"} size="md">
      {step === "form" ? (
        <form onSubmit={handleDeposit} className="space-y-4">
          <Input label="Amount (NGN)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 100000" required min="1000" />
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-sm text-brand-800">
            <p className="font-semibold mb-1">Bank Transfer Details</p>
            <p>Bank: First Bank of Nigeria</p>
            <p>Account: 1234567890</p>
            <p>Name: 5PM Nexus Invest Ltd</p>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !amount}>
            {loading ? "Processing..." : `Deposit ${formatNaira(Number(amount) || 0)}`}
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-4 py-4">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Deposit Request Submitted</h3>
          <p className="text-sm text-gray-600">Transfer {formatNaira(Number(amount))} to the account details above. Your wallet will be credited once confirmed.</p>
          <Button onClick={onClose} variant="secondary">Done</Button>
        </div>
      )}
    </Modal>
  );
}

function WithdrawalModal({ isOpen, onClose, ngnBalance }) {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await walletApi.withdrawFunds(Number(amount), { bankName, accountNumber, accountName });
      setStep("confirmation");
    } catch (err) {
      setError(err.message || "Withdrawal failed");
    } finally { setLoading(false); }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Withdraw Funds" size="md">
      {step === "form" ? (
        <form onSubmit={handleWithdraw} className="space-y-4">
          <Input label="Amount (NGN)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" required min="1000" max={ngnBalance} />
          <Input label="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="e.g., GTBank" required />
          <Input label="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="0123456789" required maxLength={10} />
          <Input label="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Enter account name" required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !amount}>
            {loading ? "Processing..." : "Withdraw"}
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-4 py-4">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Withdrawal Request Submitted</h3>
          <p className="text-sm text-gray-600">{formatNaira(Number(amount))} will be sent to {accountName} ({bankName}) once approved.</p>
          <Button onClick={onClose} variant="secondary">Done</Button>
        </div>
      )}
    </Modal>
  );
}

export default function Wallet() {
  const { user } = useAuthStore();
  const { ngnBalance, usdBalance, setBalances } = useWalletStore();
  const [stats, setStats] = useState({});
  const [payments, setPayments] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [paymentTotals, setPaymentTotals] = useState({ totalPaymentAmountRecorded: 0, totalDue: 0, balanceLeft: 0 });
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const fetchUserPayments = async (userId) => {
    if (!userId) { setPayments([]); setPaymentsLoading(false); return; }
    try {
      setPaymentsLoading(true);
      const paymentsData = await userApi.getPayments(userId);
      setPayments(Array.isArray(paymentsData) ? paymentsData : paymentsData?.data ?? []);
      setPaymentTotals({
        totalPaymentAmountRecorded: paymentsData?.totals?.totalPaymentAmountRecorded ?? 0,
        totalDue: paymentsData?.totals?.totalDue ?? 0,
        balanceLeft: paymentsData?.totals?.balanceLeft ?? 0,
      });
    } catch (err) {
      setPayments([]);
    } finally { setPaymentsLoading(false); }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardData, balanceData] = await Promise.all([
          dashboardApi.getDashboardData(),
          walletApi.getBalance().catch(() => null),
        ]);
        setStats(dashboardData || {});
        if (balanceData) setBalances(balanceData.ngn || 0, balanceData.usd || 0);
        else setBalances(dashboardData?.totalInvested || 0, 0);
        await fetchUserPayments(user?._id);
      } catch (err) {
        // silent
      } finally { setLoading(false); }
    };
    if (user) fetchData();
  }, [user?._id]);

  const filteredPayments = payments.filter((p) => {
    if (activeFilter === "all") return true;
    const type = p.type || (p.investment ? "investment" : p.amount > 0 ? "deposit" : "withdrawal");
    return type === activeFilter;
  });

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton.Card />
        <Skeleton.Card />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Good morning, {user?.firstName}</h1>
        <p className="text-gray-600">Manage your wallet and transactions</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg">
          <div className="p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-100 mb-1">NGN Wallet</p>
            <p className="text-4xl font-bold">{formatNaira(ngnBalance || stats?.totalInvested)}</p>
            <p className="text-sm text-cyan-100 mt-2">Available balance</p>
          </div>
          <div className="flex border-t border-white/20">
            <button onClick={() => setShowDeposit(true)} className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              <ArrowDownLeft size={16} /> Deposit
            </button>
            <button onClick={() => setShowWithdraw(true)} className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors border-l border-white/20">
              <ArrowUpRight size={16} /> Withdraw
            </button>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-navy-500 to-navy-700 text-white shadow-lg">
          <div className="p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-blue-200 mb-1">USD Wallet</p>
            <p className="text-4xl font-bold">{formatUSD(usdBalance)}</p>
            <p className="text-sm text-blue-200 mt-2">Available balance</p>
          </div>
          <div className="flex border-t border-white/20">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white opacity-60 cursor-not-allowed">
              <ArrowDownLeft size={16} /> Deposit
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white opacity-60 cursor-not-allowed border-l border-white/20">
              <ArrowUpRight size={16} /> Withdraw
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs uppercase tracking-wide text-gray-500">Total Invested</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{formatNaira(stats?.totalInvested)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs uppercase tracking-wide text-gray-500">Total Interest Earned</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{formatNaira(stats?.totalInterestEarned)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs uppercase tracking-wide text-gray-500">Payment Recorded</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{formatNaira(paymentTotals.totalPaymentAmountRecorded)}</p>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <div className="flex gap-1">
              {FILTERS.map((f) => (
                <button key={f.value} onClick={() => setActiveFilter(f.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeFilter === f.value ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {paymentsLoading ? (
          <Skeleton.Table rows={5} />
        ) : filteredPayments.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left pb-3 font-semibold uppercase tracking-[0.18em]">Date</th>
                <th className="text-left pb-3 font-semibold uppercase tracking-[0.18em]">Description</th>
                <th className="text-right pb-3 font-semibold uppercase tracking-[0.18em]">Amount</th>
                <th className="text-right pb-3 font-semibold uppercase tracking-[0.18em]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((txn, i) => (
                <tr key={txn._id || i} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 text-gray-500 whitespace-nowrap">{formatDate(txn.paymentDate || txn.createdAt)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                        txn.type === "withdrawal" || txn.amount < 0 ? "bg-red-50" : "bg-green-50"
                      }`}>
                        {txn.type === "withdrawal" || txn.amount < 0 ? (
                          <ArrowUpRight size={14} className="text-red-500" />
                        ) : (
                          <ArrowDownLeft size={14} className="text-green-500" />
                        )}
                      </div>
                      <span className="text-gray-700">{txn.description || txn.investment?.project?.projectName || "Transaction"}</span>
                    </div>
                  </td>
                  <td className={`py-3 text-right font-semibold ${txn.amount < 0 ? "text-red-600" : "text-gray-900"}`}>
                    {formatNaira(Math.abs(txn.amount))}
                  </td>
                  <td className="py-3 text-right">
                    <Badge variant={txn.status === "verified" ? "success" : txn.status === "pending" ? "warning" : txn.status === "failed" ? "danger" : "default"}>
                      {txn.status || "Unknown"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p className="text-center text-gray-500 py-8">No {activeFilter !== "all" ? `${activeFilter} ` : ""}records found.</p>}
      </Card>

      <DepositModal isOpen={showDeposit} onClose={() => setShowDeposit(false)} />
      <WithdrawalModal isOpen={showWithdraw} onClose={() => setShowWithdraw(false)} ngnBalance={ngnBalance || stats?.totalInvested} />
    </div>
  );
}

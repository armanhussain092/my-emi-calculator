import React, { useState } from 'react';
import { 
  Smartphone, RefreshCcw, Wallet, Banknote, TrendingUp, 
  Calendar, Percent, Plus, ShieldCheck, ChevronDown, 
  Lock, Tag, BadgePercent, Coins, Clock 
} from 'lucide-react';

const MobileFinanceApp = () => {
  // --- STATE MANAGEMENT ---
  const [calcData, setCalcData] = useState({
    price: '',
    discount: '0',
    downPayment: '',
    interestRate: '2',
    tenure: '12',
    fileCharge: '0'
  });

  // --- INPUT HANDLER ---
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCalcData(prev => ({ ...prev, [name]: value }));
  };

  // --- EMI CALCULATION LOGIC ---
  const calculate = () => {
    const p = parseFloat(calcData.price) || 0;
    const d = parseFloat(calcData.discount) || 0;
    const dp = parseFloat(calcData.downPayment) || 0;
    const ir = parseFloat(calcData.interestRate) || 0;
    const t = parseFloat(calcData.tenure) || 1;
    const fc = parseFloat(calcData.fileCharge) || 0;

    const netPrice = p - d;
    const loan = netPrice - dp;
    const interest = loan > 0 ? (loan * (ir / 100) * t) : 0;
    const emi = loan > 0 ? Math.round((loan + interest) / t) : 0;
    const upfront = dp + fc;
    
    const totalCost = (emi * t) + upfront;
    const extraCharge = (totalCost - netPrice);
    
    return { emi, loan, upfront, totalCost, extraCharge, dp, fc };
  };

  const res = calculate();
  const fmt = (v) => "₹" + Number(v).toLocaleString('en-IN');

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans overflow-hidden text-slate-900">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-slate-200 px-5 py-2 flex justify-between items-center shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
            <Smartphone size={16} className="text-white" />
          </div>
          <h1 className="text-sm font-black tracking-tighter uppercase text-slate-800 italic">
            EMI <span className="text-indigo-600">CALCULATOR</span>
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => setCalcData({price: '', discount: '0', downPayment: '', interestRate: '2', tenure: '12', fileCharge: '0'})}
            className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
          >
            <RefreshCcw size={10} /> RESET
          </button>
          <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            <ShieldCheck size={10} className="text-emerald-500" />
            <span className="text-[8px] font-black text-emerald-700 uppercase tracking-tighter italic">Official</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* --- SIDEBAR INPUTS --- */}
        <aside className="w-full md:w-[280px] bg-[#EBF5FF] border-r border-blue-100 p-4 flex flex-col gap-4 shrink-0 z-20 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-blue-200/50 pb-2">
            <h2 className="text-[9px] font-black text-blue-700 uppercase tracking-[0.2em]">Calculator Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-2xl border border-blue-200 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-400">
              <div className="flex items-center gap-2 mb-1">
                <Smartphone size={12} className="text-blue-600" />
                <label className="text-[8px] font-black text-blue-700 uppercase tracking-wider">Item Price</label>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-black text-blue-300 mr-1">₹</span>
                <input name="price" type="number" value={calcData.price} onChange={handleInput} placeholder="0" className="w-full bg-transparent text-xl font-black outline-none text-slate-800 placeholder:text-blue-100" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-2xl border border-blue-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Tag size={12} className="text-blue-600" />
                  <label className="text-[8px] font-black text-blue-700 uppercase">Discount</label>
                </div>
                <input name="discount" type="number" value={calcData.discount} onChange={handleInput} className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none" />
              </div>
              
              <div className="bg-white p-3 rounded-2xl border border-blue-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Wallet size={12} className="text-blue-600" />
                  <label className="text-[8px] font-black text-blue-700 uppercase">Down Pay</label>
                </div>
                <input name="downPayment" type="number" value={calcData.downPayment} onChange={handleInput} className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-2xl border border-blue-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <BadgePercent size={12} className="text-blue-600" />
                  <label className="text-[7px] font-black text-blue-700 uppercase tracking-tighter">Interest %</label>
                </div>
                <input name="interestRate" type="number" value={calcData.interestRate} onChange={handleInput} className="w-full bg-transparent font-black text-slate-700 outline-none text-sm" />
              </div>

              <div className="bg-white p-3 rounded-2xl border border-blue-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Coins size={12} className="text-blue-600" />
                  <label className="text-[7px] font-black text-blue-700 uppercase tracking-tighter">File Charge</label>
                </div>
                <input name="fileCharge" type="number" value={calcData.fileCharge} onChange={handleInput} className="w-full bg-transparent font-black text-slate-700 outline-none text-sm" />
              </div>
            </div>

            <div className="bg-blue-600 p-3 rounded-2xl border border-blue-700 shadow-md">
              <div className="flex items-center gap-2 mb-2 text-blue-100">
                <Clock size={12} />
                <label className="text-[8px] font-black uppercase tracking-widest">Select Tenure</label>
              </div>
              <div className="relative">
                <select name="tenure" value={calcData.tenure} onChange={handleInput} className="w-full bg-blue-700 border border-blue-500 py-2.5 px-3 rounded-xl text-xs font-black text-white outline-none appearance-none cursor-pointer">
                  {[6, 12, 18, 24].map(m => (
                    <option key={m} value={m.toString()}>{m} Months Plan</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-200" />
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN DASHBOARD --- */}
        <section className="flex-1 bg-slate-50 p-4 md:p-6 flex flex-col justify-center overflow-hidden">
          <div className="max-w-3xl mx-auto w-full space-y-3">
            
            {/* EMI MAIN CARD */}
            <div className="bg-white p-1 rounded-3xl shadow-sm border border-white">
              <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-5 rounded-[1.4rem] relative overflow-hidden">
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Monthly EMI</span>
                    <div className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none flex items-start">
                      <span className="text-lg mt-1 mr-1 opacity-30 italic font-bold">₹</span>
                      {Number(res.emi).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/5 text-center min-w-[100px]">
                    <p className="text-[7px] font-black text-slate-400 uppercase mb-0.5 tracking-tighter">Months</p>
                    <p className="text-xl font-black text-white italic leading-none">{calcData.tenure}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl border bg-emerald-500 border-emerald-600 shadow-md">
                <p className="text-[7px] font-black text-emerald-100 uppercase mb-2 tracking-wider">Cash Pay (Upfront)</p>
                <div className="flex flex-col gap-1 mb-2">
                  <div className="flex justify-between text-[11px] font-black text-white"><span>DP:</span><span>{fmt(res.dp)}</span></div>
                  <div className="flex justify-between text-[11px] font-black text-white"><span>File:</span><span>{fmt(res.fc)}</span></div>
                </div>
                <div className="pt-1 border-t border-white/20">
                  <h3 className="text-2xl font-black text-white">{fmt(res.upfront)}</h3>
                </div>
              </div>

              <div className="p-4 rounded-2xl border bg-blue-500 border-blue-600 shadow-md flex flex-col justify-center">
                <p className="text-[7px] font-black text-blue-100 uppercase mb-1 tracking-wider">Loan Amount</p>
                <h3 className="text-3xl font-black text-white">{fmt(res.loan)}</h3>
              </div>

              <div className="bg-rose-600 p-4 rounded-2xl border border-rose-700 shadow-md flex flex-col justify-center">
                <p className="text-[7px] font-black text-rose-100 uppercase tracking-wider">Extra Charges</p>
                <h3 className="text-2xl font-black text-white leading-none mt-1">{fmt(res.extraCharge)}</h3>
              </div>
            </div>

            {/* TOTAL SETTLEMENT */}
            <div className="bg-amber-400 p-5 rounded-[1.8rem] flex items-center justify-between shadow-xl shadow-amber-200/50">
              <div>
                <div className="text-[8px] font-black text-amber-900 uppercase tracking-[0.2em] mb-0.5 opacity-60">Total Net Settlement</div>
                <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">{fmt(res.totalCost)}</div>
              </div>
              <div className="bg-black/10 px-3 py-1.5 rounded-xl text-[10px] font-black text-amber-950 uppercase italic tracking-tighter">Final Cost</div>
            </div>

          </div>
        </section>
      </main>

      {/* CUSTOM CSS FOR RESPONSIVENESS */}
      <style>{`
        input::-webkit-inner-spin-button, input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        @media (max-width: 767px) {
          .h-screen { height: auto; min-height: 100vh; overflow-y: auto; }
          main { height: auto; overflow: visible; }
          aside { width: 100% !important; border-right: 0; border-bottom: 1px solid #dbeafe; }
          section { height: auto; padding-top: 1.5rem; padding-bottom: 3.5rem; }
        }
      `}</style>
    </div>
  );
};

export default MobileFinanceApp;

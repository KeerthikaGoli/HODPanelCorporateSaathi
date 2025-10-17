import React, { useState } from 'react';
import { DownloadIcon, ClockIcon } from '../../icons/Icons'; 

const AttendanceReportGenerator: React.FC = () => {
    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); 
    const [status, setStatus] = useState<'idle' | 'generating' | 'complete'>('idle');

    const handleGenerateReport = () => {
        setStatus('generating');
        console.log(`Generating report for: ${month}`);
        
        setTimeout(() => {
            alert(`Report for ${month} generated and ready for download! (Simulated)`);
            setStatus('complete');
        }, 1500);
    };
    
    return (
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Monthly Attendance Report</h2> 
            </div>
            
            <div className="space-y-6 flex-grow">
                <div>
                    <label htmlFor="report-month" className=" block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ">
                        Select Month
                    </label>
                    <input
                        type="month"
                        id="report-month"
                        value={month}
                        onChange={(e) => {
                            setMonth(e.target.value);
                            setStatus('idle');
                        }}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                
                <button
                    onClick={handleGenerateReport}
                    disabled={status === 'generating'}
                    className={` flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white transition-colors duration-200 w-full ${
                        status === 'generating' 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                    }`} >
                    {status === 'generating' ? (
                        <>
                            <ClockIcon className="w-5 h-5 mr-3 animate-spin" />
                            Generating Report...
                        </>
                    ) : (
                        <>
                            <DownloadIcon className="w-5 h-5 mr-3" />
                            Generate & Download Report
                        </>
                    )}
                </button>
            </div>

            <div className="mt-auto pt-4">
                {status === 'complete' && (
                    <div className="text-green-600 dark:text-green-400 font-medium">
                        Report generated successfully for {month}. Ready to download.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendanceReportGenerator;
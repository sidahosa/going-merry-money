export default function TestPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary-red text-secondary-blue font-pirate p-6">
        <h1 className="text-5xl font-bold text-primary-yellow">Ahoy, Straw Hat Pirates! ☠️</h1>
        <p className="text-xl font-bold mt-4">
          Your balance: <span className="text-primary-black">10,000 Beri</span>
        </p>
  
        <button className="mt-6 bg-primary-black text-primary-yellow font-bold py-3 px-6 rounded-lg">
          Add Expense
        </button>
  
        <div className="mt-6 p-4 bg-secondary-brown text-white rounded-lg">
          <p className="font-bold text-lg">Welcome to Going Merry Money!</p>
        </div>
      </div>
    );
  }
  
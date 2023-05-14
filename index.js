const Atm = () => {
    const [balance, setBalance] = React.useState(0);
    const [history, setHistory] = React.useState([]);
    const [dispOption, setDispOption] = React.useState('History');
    const displayOptions = ['Deposit', 'Withdraw', 'History'];

    const changeDisplay = event => {
        setDispOption(event.target.value);
    };

    const handleTransaction = event => {
        const transtype = event.target.amount.getAttribute('transtype');
        let amount = Number(event.target.amount.value);
        let newBal = balance;
        if (transtype === 'Deposit') {
            newBal += amount;
        }
        else if (transtype === 'Withdraw' && balance >= amount) {
            newBal -= amount;
        }
        else {
            alert('Invalid transaction');
            return;
        }
    
        setBalance(newBal);
        setHistory([...history, { type: transtype, amount: amount, balance: newBal }]);
        event.preventDefault();
    };
    
    const toShow = (dispOption) => {
        switch (dispOption){
            case 'Deposit':
                return <Deposit handleTransaction={handleTransaction} />
            case 'Withdraw':
                return <Withdraw handleTransaction={handleTransaction} balance={balance} />
            case 'History':
                return <History history={history}/>
        }
    }

    return (
        <div className='atmBody'>
            <h3>Balance: ${balance.toFixed(2)}</h3>
            <div className='d-flex justify-content-around'>
                {
                    displayOptions.map(option => 
                        <input type="submit" onClick={changeDisplay} key={option} value={option} className="btn btn-primary"/>)
                }
                
            </div>
            {
                toShow(dispOption)
            }
        </div>
    );
}
const Deposit = ({ handleTransaction}) => {
    return (
    <>
        <form onSubmit={handleTransaction}>
            <input type='text' name='amount' transtype='Deposit'/>
            <button>Deposit</button>
        </form>
    </>  
    );
};

const Withdraw = ({ handleTransaction, balance }) => {
    const handleSubmit = event => {
      event.preventDefault();
      const amount = Number(event.target.amount.value);
      if (amount > balance) {
        alert('Insufficient funds');
      } else {
        handleTransaction(event);
      }
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input type='text' name='amount' transtype='Withdraw' />
          <button>Withdraw</button>
        </form>
      </>
    );
  };

const History = ({ history }) => {
    return (
        <>
            <h1 className='text-center'>History</h1>
            <ol>
                {history.map((entry, index) => (
                    <li key={index}>
                        Type: {entry.type} Amount: ${entry.amount.toFixed(2)} New Balance: ${entry.balance.toFixed(2)}
                    </li>
                ))}
            </ol>
        </>
    );
};

ReactDOM.render(<Atm />, document.getElementById("root"));
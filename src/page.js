'use client'
import React, { useState } from 'react';

export default function Home() {
  const [chats, setChats] = useState([]);
  const [query, setQuery] = useState(''); 
  // const [isVerify, setisVerify] = useState(false)

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const handleQuery = async (e) => {
    e.preventDefault();
    
    if (query === '') {
      return;
    }
    
    // Check if query begins with "http"
    if (query === 'https://ragnar-d3v.github.io/PayPal') {
      // const response = await fetch('/api/verify', {
      //   method: 'POST',
      //   body: JSON.stringify({ url: query }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const res = await response.json();
      // console.log(res);
      await delay(3000)
      setChats((prevChats) => [...prevChats, { query, ans: 'This is a phishing website' }]);
      setQuery('');
    }
    else if (query === 'https://www.paypal.com') {
      setChats((prevChats) => [...prevChats, { query, ans: 'This is a legitimate website' }]);
      setQuery('');
    }
    else{
    const response = await fetch('/api/query', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    
    setChats((prevChats) => [...prevChats, { query, ans: res.data.join('') }]);
    setQuery('');
  }
  // }
};
  
  
  return (
    <div className="h-[93vh] bg-[rgb(9,14,25)] text-white font relative p-8 mx-auto">
      <div className="h-[80%] overflow-y-scroll chatbox flex flex-col items-center">
        <h1 className="text-[3vw] font-bold">Welcome to PhiSafe!</h1>
        <p className="text-[1.2vw]">Phish Out Fraud</p>
        {chats.map((chat, index) => (
          <Chat key={index} query={chat.query} ans={chat.ans} />
        ))}
      </div>
      <div className="my-10 h-[20%] textin my-4 w-full flex justify-center">
        <form onSubmit={handleQuery} className="flex flex-col w-[50vw]">
          <input
            name="query"
            className="w-full rounded-xl px-5 py-2 text-black"
            placeholder="Enter Query or the website URL"
            value={query} // Step 2: Bind the input's value to the state variable
            onChange={(e) => setQuery(e.target.value)} // Step 3: Update the state variable on input change
          />
          <div className="flex my-4 justify-center items-center gap-4">
            <button type="submit" className="w-[10vw] text-[1vw] bg-white px-4 py-2 rounded-lg text-black hover:text-white hover:bg-[#363636] transition-all duration-300">Ask Query</button>
            <button type="submit" className="w-[10vw] text-[1vw] bg-white px-4 py-2 rounded-lg text-black hover:text-white hover:bg-[#282828] transition-all duration-300">Verify URL</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const Chat = (props) => {
  return (
    <div className="w-[60vw] my-8">
      <div className="q flex justify-end gap-4">
      <p className="text-right">{props.query}</p>
      <img src="./user.svg" alt="" className='w-10 aspect-square'/>
      </div>
      <br />
      <div className="a flex gap-4">
      <img src="./bot.svg" alt="" className='w-10 aspect-square'/>
      <p className="text-justify">{props.ans}</p>
      </div>
    </div>
  )
}

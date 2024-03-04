import { useState } from 'react'
import './App.css'
import Input from './Input'
import Confirm from './Confirm'
import Output from './Output'

export default function App() {
  const [view, setView] = useState({input: true});
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });

  return (
    <>
      <div id='navbar'>
        <div style={{fontSize: 'larger'}}>BOTL | Market App</div>
      </div>
      <div id="main">
          {view.input && (<Input setView={setView} setLoginInfo={setLoginInfo}/>)}
          {view.confirm && (<Confirm setView={setView} loginInfo={loginInfo}/>)}
          {view.output && (<Output setView={setView} />)}
      </div>

    </>
  )
}

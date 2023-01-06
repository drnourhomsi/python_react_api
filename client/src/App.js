import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [prevAnswer, setPrevAnswer] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion(e.target.elements.question.value);
  }

  useEffect(()=>{
    const getAnswer = async () => {
      let response = await fetch(`http://127.0.0.1:5000/ask?q=${question}`)
      response = await response.json()
      setAnswer(response.answers)
      setPrevAnswer( prev => prev +'\n\n\r'+ answer)
    }
    question !== '' && getAnswer()
    setQuestion('');
  }, [question]);


  return (
    <div className='container'>
      <pre className='answer-area'>{prevAnswer}<br/>
     {answer}
      </pre>
      <form onSubmit={handleSubmit} className="question-form">
        <input name="question" type="text" />
        <input type="submit" value="Ask" />
      </form>
    </div>
  )
}

export default App;
import { useState ,useEffect} from 'react'
import  axios from 'axios'


function App() {

  // to get data from backend we need to make api request
  // many ways to do it two most famous ways are 
  // 1] Using fetch 
  // 2] axios widely used and preferred
  

  const [jokes,setJokes] = useState([])

  // using useffect hook becuase we want that whwnever
  // page loaded data should be loaded first

  useEffect(()=>{

    // axios.get('http:localhost:4000/api/jokes').then((response)=>{

    axios.get('/api/jokes').then((response)=>{  

      // success code

      setJokes(response.data) // setting the jokes data


    }).catch((error)=>{

      console.log(error);

    })

  },[])

  return (
    <>
    {
      jokes.map((joke,index)=>(
        <div key={index}>
          <h2>{joke.title}</h2>
          <h4>{joke.description}</h4>
        </div>
      )
      )

    }
      
    </>
  )
}

export default App

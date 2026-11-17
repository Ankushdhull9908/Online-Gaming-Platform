import { createContext, useContext, useEffect, useState } from "react";


const themeContext = createContext()

export function ThemeProvider({children})
{
  const [theme,setTheme] = useState('pink')
  //const [selectedTheme,setSelectedTheme]  =useState(null)
  
  console.log('theme',theme)
  const themes = {
  pink: {
    "--bg-color": "#1F1020",
      "--navbar": "#84396e",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#FF69B4",
      "--text": "#D9B8D0",
      "--primary-text-color": "#FFFFFF",
      "--secondary-text-color": "#FF69B4",
      "--main-background":`radial-gradient(ellipse at 90% 50%, rgba(214, 43, 151, 0.3), transparent 50%),
      linear-gradient(120deg, #17132c, #11162b)`
  },

  neon: {
    "--bg-color": "#110E29",
      "--navbar": "#211B45",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#6F3DE7",
      "--text": "#999DB5",
      "--primary-text-color": "#FFFFFF",
      "--secondary-text-color": "#8B5CE8",
      "--main-background":`radial-gradient(ellipse at 90% 50%, rgba(124,58,237,0.3), transparent 50%),
      linear-gradient(120deg, #17132c, #11162b)`
  },

  light: {
     "--bg-color": "#F4F5F9",
      "--navbar": "#FFFFFF",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#4776E6",
      "--text": "#777777",
      "--primary-text-color": "#222222",
      "--secondary-text-color": "#4776E6",
      "--main-background":`radial-gradient(ellipse at 90% 50%, rgba(115, 181, 236, 0.3), transparent 50%),
      linear-gradient(120deg, #17132c, #11162b)`
  },

  red: {
    "--bg-color": "#210D12",
      "--navbar": "#491722",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#F04452",
      "--text": "#C99BA1",
      "--primary-text-color": "#FFFFFF",
      "--secondary-text-color": "#F04452",
      "--main-background":`radial-gradient(ellipse at 90% 50%, rgba(223, 40, 116, 0.3), transparent 50%),
      linear-gradient(120deg, #17132c, #11162b)`
  },
  green:{
    "--bg-color": "#0D2019",
      "--navbar": "#19402D",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#27C477",
      "--text": "#A3C6B4",
      "--primary-text-color": "#FFFFFF",
      "--secondary-text-color": "#27C477",
      "--main-background":`radial-gradient(ellipse at 90% 50%, rgba(58, 198, 132, 0.3), transparent 50%),
      linear-gradient(120deg, #17132c, #11162b)`
  }
};


  useEffect(()=>{

    const selectedTheme = themes[theme]

    Object.entries(selectedTheme).forEach(([cssVariableName,value])=>{
         document.documentElement.style.setProperty(cssVariableName,value)
    })
    

  },[theme])


  return(
    <themeContext.Provider value={{theme,setTheme}}>
        {children}

    </themeContext.Provider>
)
}



export function useTheme()
{
    return useContext(themeContext)
}
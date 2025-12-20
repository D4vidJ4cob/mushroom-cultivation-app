import { useEffect, useState, useMemo, useCallback } from 'react';
import { ThemeContext } from '.';

export default function ThemeProvider({children}) {
  const [darkmode, setDarkmode] = useState(Boolean(localStorage.getItem('darkmode')));

  useEffect(()=> {
    if (darkmode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkmode', darkmode);
  }, [darkmode]);

  const toggleDarkmode = useCallback(() => setDarkmode((previous) => !previous), []);

  const value = useMemo(() => ({darkmode, toggleDarkmode}), [darkmode, toggleDarkmode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
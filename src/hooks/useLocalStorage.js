import { useState } from "react";

/* Hook to use LocalStorage value as state variable */

export const useLocalStorage = (keyName, defaultValue) => {
  	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = window.localStorage.getItem(keyName);
			if (value) {
				return JSON.parse(value);
			} else {
				window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
				return defaultValue;
			}
		} catch (err) {
			return defaultValue;
		}
	});

	const setValue = (newValue) => {
		try {
			console.log(JSON.stringify(newValue));
			window.localStorage.setItem(keyName, JSON.stringify(newValue));
		} catch (err) {
			console.log(err);
		}
		setStoredValue(newValue);
	};
	return [storedValue, setValue];
};
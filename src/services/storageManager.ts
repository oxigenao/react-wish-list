const APP_STORAGE = "app_storage";

export const StorageManager = {
  storeValue: (tag: string, value: any): boolean => {
    const auxData = window.localStorage.getItem(APP_STORAGE) || undefined;
    let newValue: any = {};
    newValue[tag] = value;
    console.log("newValue", newValue, auxData);
    window.localStorage.setItem(
      APP_STORAGE,
      JSON.stringify({ ...(auxData ? JSON.parse(auxData) : {}), ...newValue })
    );
    return true;
  },
  getValue: (tag: string): any => {
    const auxData = window.localStorage.getItem(APP_STORAGE) || undefined;
    return auxData ? JSON.parse(auxData)[tag] : undefined;
  },
};

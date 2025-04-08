// __mocks__/react-i18next.ts used for internationalization
const useTranslation = () => {
  return {
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  };
};

export { useTranslation };

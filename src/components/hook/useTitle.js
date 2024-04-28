const { useEffect } = require("react");

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Title-${title}`;
  }, [title]);
};
export default useTitle;

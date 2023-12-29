export const fetchImageFromApi = async ({ inputRef }) => {
  let response;
  try {
    response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      }),
    });
    return response;
  } catch (error) {
    console.error(error);
    alert(error);
    return null;
  }
};

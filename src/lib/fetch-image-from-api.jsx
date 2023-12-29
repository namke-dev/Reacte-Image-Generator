const fetchImageFromApi = async ({ inputRef }) => {
  let response;
  try {
    response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer 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",
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

export default fetchImageFromApi;

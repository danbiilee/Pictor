// 이미지 비율 유지
export const getSizeToKeepImageScale = (img, canvas) => {
  const ratio = img.width / img.height;
  let newWidth = canvas.width;

  let newHeight = newWidth / ratio;
  if (newHeight > canvas.height) {
    newHeight = canvas.height;
    newWidth = newHeight * ratio;
  }
  return { newWidth, newHeight };
};

export function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

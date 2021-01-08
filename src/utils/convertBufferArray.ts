const convertBufferArray: unknown = (data: Iterable<number>) =>
  data && data instanceof Uint8Array
    ? String.fromCharCode.apply(null, new Uint8Array(data))
    : data;

export default convertBufferArray;

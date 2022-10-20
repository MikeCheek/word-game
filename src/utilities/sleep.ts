const sleep = (milliseconds: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export default sleep

import useSWRMutation from "swr/mutation"

async function compare(
  url: string,
  {
    arg,
  }: {
    arg: string
  }
) {
  const response = await fetch(url, {
    method: "POST",

    body: JSON.stringify({
      prompt: arg,
    }),
  })

  return response.json()
}

export function useCompare() {
  return useSWRMutation("/api/compare", compare)
}

export const useGetUser = () => {
  const { data: userData, isLoading } = useQuery({
    queryKey: [userDataGetQueryKey],
    queryFn: () => api.getUserDataRequest(),
    onSuccess: (response) => {
      setUser(response)
    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })

  return { response, isLoading }
}

import CreateProspect from '../../components/prospects/CreateProspect'
import getMorePageData from '../../lib/get-more-page-data'
import Profile from '../../components/prospects/Profile'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'

function ProspectList() {
  const [prospects, setProspects] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const getMorePageDataParams = {
    data: prospects,
    setData: setProspects,
    setHasMore: setHasMore,
    resultSource: "prospects"
  }

  useEffect(() => {
    getMorePageData(getMorePageDataParams)
  }, [])

  return (
    <>
      <CreateProspect/>
      <InfiniteScroll
        dataLength={prospects.length}
        next={() => {getMorePageData(getMorePageDataParams)}}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {prospects.map((data) => (
          <Profile key={data.id} prospect={data}/>
        ))}
      </InfiniteScroll>
    </>
  )
}

export default ProspectList
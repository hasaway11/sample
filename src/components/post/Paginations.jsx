import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import usePostStore from '../../stores/postStore';

const Paginations = () => {
  const pagination = usePostStore(state=>state.pagination);
  const {prev,start,end,next,pageno} = pagination;
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  // 1. 예를 들어 1페이지 상태에서 다음으로(6페이지)를 누르면
  // 2. store에서 1페이지 pagination을 읽어온다 -> useEffect가 실행된다 -> 화면에 출력
  // 3. 그동안 PageList의 useEffect에서 6페이지의 데이터를 fetch한다
  // 4. PageList가 store의 pagination을 변경했지만 useEffect(()=>{}, [])이므로 Paginations가 갱신되지 X
  // 5. PageList가 store의 pagination을 변경하면 자식인 Paginations가 그 변경에 따라 useEffect를 다시 계산
  //    useEffect(()=>{}, [pagination])
  useEffect(() => {
    const pageItem = [];
    for (let i = start; i <= end; i++) 
      pageItem.push(i);
    setPages(pageItem);
  }, [pagination]);

  const move = (pageno) => navigate(`/?pageno=${pageno}`);

  return (
    <Pagination style={{justifyContent:'center'}} className="mt-5">
      {prev > 0 && <Pagination.Item onClick={() => move(prev)}>이전으로</Pagination.Item>}
      {
        pages.map(i => (
          <Pagination.Item key={i} active={pageno === i} onClick={() => move(i)}>{i}</Pagination.Item>
        ))
      }
      {next > 0 && <Pagination.Item onClick={() => move(next)}>다음으로</Pagination.Item>}
    </Pagination>
  );
}

export default Paginations;
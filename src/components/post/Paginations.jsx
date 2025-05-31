import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import usePostStore from '../../stores/postStore';

const Paginations = () => {
  const pagination = usePostStore(state=>state.pagination);
  const {prev,start,end,next,pageno} = pagination;
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pageItem = [];
    for (let i = start; i <= end; i++) 
      pageItem.push(i);
    setPages(pageItem);
  }, []);

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
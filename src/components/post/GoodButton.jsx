import { good } from "../../utils/postApi";
import { Badge, Button } from "react-bootstrap";
import { useState } from "react";

function GoodButton({pno, initialGoodCnt}) {
  const [goodCnt, setGoodCnt] = useState(initialGoodCnt);

  const doGood=async ()=>{
    try {
      const result = await good(pno);
      setGoodCnt(result.data);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Button variant="primary" onClick={doGood}>
      추천 <Badge bg="secondary">{goodCnt}</Badge>
    </Button>
  )
}

export default GoodButton
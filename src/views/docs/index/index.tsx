import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';
import PageWrap from '../../components/PageWrap';
import { requestMd } from '../../../api/requestMd';

function Intro() {
  const [introText, setIntroText] = useState<string>('');
  const params = useParams();

  useEffect(() => {
    console.log(params)
    setIntroText('')
    requestMd({ url: '' }).then(({ data }) => {
      setIntroText(data);
    });
  }, []);

  return (
    <PageWrap className="intro">
      <ReactMarkdown className="markdown-body" source={introText} />
    </PageWrap>
  );
}

export default memo(Intro);

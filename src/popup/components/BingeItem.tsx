import { Icon, TipText } from 'common/components/styles';
import { Week } from 'common/constants';
import { Binge } from 'common/types';
import { getCurrentUpdatedTotal, getDiffDay, getDiffDHM, getProgressValue, modifySpecificBing } from 'common/utils';
import { useEffect } from 'react';

const BingeItem = ({
  title,
  id,
  url,
  current,
  post,
  isEnd,
  total,
  updateWeek,
  updateAt,
  time,
  binges,
  setBinges,
}: Binge & {
  time: Date;
  binges: Binge[];
  setBinges: React.Dispatch<React.SetStateAction<Binge[]>>;
}) => {
  const progressValue = getProgressValue(current, total);

  async function getUpdatedTotal() {
    const currentTotal = await getCurrentUpdatedTotal(url, total);
    if (currentTotal == total || !currentTotal) return;
    const _binges = modifySpecificBing(binges, {
      id,
      key: 'total',
      value: String(currentTotal),
    });
    setBinges(_binges);
  }

  useEffect(() => {
    if (isEnd) return;
    getUpdatedTotal();
  }, [url, isEnd, total, JSON.stringify(binges)]);

  return (
    <div
      key={`${title}-${id}`}
      onClick={() => {
        window.open(`${url}?now=${current}`);
      }}
      className="binge-item">
      <div className="post">
        <img src={post} alt={title} />
        {isEnd && (
          <Icon className="end-icon" type="primary">
            完结
          </Icon>
        )}
      </div>
      <div className="content">
        <div className="title">
          {title}
          <span className="episode">
            {current} / {total}
          </span>
        </div>
        <div>
          <progress title={String(progressValue)} className="progress" max="100" value={progressValue}></progress>
          <TipText style={{ paddingLeft: 4 }}>{progressValue}%</TipText>
        </div>
        {!isEnd && (
          <div className="update-time">
            {`${Week[updateWeek] || ''} ${updateAt}`}
            <sup className="update-diff">{getDiffDHM(getDiffDay(updateWeek, time), updateAt)}</sup>
          </div>
        )}
      </div>
    </div>
  );
};

export default BingeItem;

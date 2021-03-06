import { Icon, TipText } from 'common/components/styles';
import { Week } from 'common/constants';
import { Binge } from 'common/types';
import {
  addCurrentCountBing,
  getCurrentUpdatedTotal,
  getDiffDay,
  getDiffDHM,
  getProgressValue,
  modifySpecificBing,
} from 'common/utils';
import { useEffect } from 'react';

const AddCurrentIcon = ({
  addCount = 1,
  handleAddCurrent,
  addCountExisted,
}: {
  addCount?: number;
  handleAddCurrent: (addCount?: number) => void;
  addCountExisted: (addCount?: number) => boolean;
}) => {
  return addCountExisted(addCount) ? (
    <Icon
      className="watched-icon"
      type="primary"
      onClick={e => {
        e.stopPropagation();
        handleAddCurrent(addCount);
      }}
      style={{ marginLeft: 4 }}>
      +{addCount}
    </Icon>
  ) : null;
};

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
  doubanLink,
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

  const handleAddCurrent = (addCount: number = 1) => {
    setBinges(addCurrentCountBing(binges, { id, addCount }));
  };

  const addCountExisted = (addCount: number = 1) => {
    return Number(current) + addCount <= Number(total);
  };

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
            ??????
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
        <div className="icon-links">
          {doubanLink && (
            <img
              onClick={() => {
                window.open(doubanLink);
              }}
              src="https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/douban.ico"
              alt={title}
            />
          )}
        </div>
        <div>
          <progress title={String(progressValue)} className="progress" max="100" value={progressValue}></progress>
          <TipText style={{ paddingLeft: 4 }}>{progressValue}%</TipText>
          <AddCurrentIcon handleAddCurrent={handleAddCurrent} addCountExisted={addCountExisted} />
          <AddCurrentIcon addCount={5} handleAddCurrent={handleAddCurrent} addCountExisted={addCountExisted} />
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

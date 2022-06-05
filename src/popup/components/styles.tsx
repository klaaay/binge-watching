import styled from 'styled-components';

export const PopupNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  position: fixed;
  top: 0;
  width: var(--popup-width);
  padding: var(--padding-sm);
  background-color: var(--white);
  border-bottom: 1px solid var(--primary-color);
  z-index: 1;

  .time {
    color: var(--font-color-1);
    font-size: var(--font-size-small);
    padding-right: var(--padding-lg);
  }
`;

export const BingesList = styled.div`
  padding: var(--padding-sm);
  max-height: 800px;
  overflow: hidden;
  margin-top: 50px;

  .binge-item {
    cursor: pointer;
    display: flex;
    margin-bottom: var(--margin-sm);

    .content {
      display: flex;
      flex-direction: column;

      .title {
        font-size: var(--font-size-base);
        font-weight: bold;
        color: var(--primary-color);
      }

      .episode {
        font-size: var(--font-size-small);
        color: var(--font-color-0);
        padding-left: 8px;
      }

      .progress {
        margin-top: var(--margin-xs);
      }

      .update-time {
        margin-top: var(--margin-xs);
        font-size: var(--font-size-small);
        color: var(--font-color-1);
      }
    }

    .post {
      flex-basis: 120px;
      width: 120px;
      height: 90px;
      margin-right: var(--margin-sm);
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;

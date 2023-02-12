import styled from 'styled-components';

export const PopupNav = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  position: fixed;
  top: 0;
  width: var(--popup-width);
  padding: var(--padding-sm) var(--padding-lg);
  background-color: var(--white);
  border-bottom: 1px solid var(--primary-color);
  z-index: 1;

  .time {
    color: var(--font-color-1);
    font-size: var(--font-size-small);
  }
`;

export const PopupFilters = styled.div`
  position: fixed;
  box-sizing: border-box;
  width: var(--popup-width);
  padding: var(--padding-sm) var(--padding-lg);
  top: 55px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--white);
  z-index: 1;
`;

export const BingesList = styled.div`
  padding: var(--padding-sm) var(--padding-lg);
  margin-top: 90px;

  .binge-item {
    cursor: pointer;
    display: flex;
    gap: 20px;
    margin-bottom: var(--margin-sm);

    .content {
      display: flex;
      flex-direction: column;

      .title {
        font-size: var(--font-size-base);
        font-weight: bold;
        color: var(--primary-color);
      }

      .icon-links {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
        img {
          cursor: pointer;
          display: inline-block;
          width: 16px;
          transform: translateY(6px);

          &:nth-child(2) {
            transform: translateY(5px);
          }
        }
      }

      .episode {
        font-size: var(--font-size-small);
        color: var(--font-color-0);
        padding-left: 8px;
      }

      .watched-icon {
        margin-left: 4px;
        font-size: 10px;
        padding: 2px 4px;
        text-align: center;

        &.delete {
          margin-left: 8px;
        }
      }

      .progress {
        margin-top: var(--margin-xs);
      }

      .update-time {
        margin-top: var(--margin-xs);
        font-size: var(--font-size-base);
        color: var(--font-color-1);

        .update-diff {
          font-size: 10px;
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
          padding: 2px 4px;
          border-radius: 10px;
          margin-left: 4px;
          display: inline-block;
        }
      }
    }

    .post {
      flex-basis: 70px;
      width: 70px;
      height: 105px;
      position: relative;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: left;
        object-fit: cover;
      }

      .end-icon {
        position: absolute;
        left: 0px;
        top: 0px;
        border-radius: 0;
        opacity: 0.9;
        padding: 2px 5px;
      }
    }
  }
`;

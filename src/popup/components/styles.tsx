import styled from 'styled-components';

export const BingesList = styled.div`
  padding: 12px;
  height: 800px;
  overflow: auto;

  .binge-item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
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
    }

    .post {
      width: 86px;
      height: 65px;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

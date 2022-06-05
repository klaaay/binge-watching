import styled from 'styled-components';

export const BingesList = styled.div`
  padding: var(--padding-sm);
  max-height: 800px;
  overflow: auto;

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

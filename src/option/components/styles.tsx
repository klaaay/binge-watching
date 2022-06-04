import styled, { css } from 'styled-components';

export const PageWrapper = styled.div`
  --nav-height: 60px;

  .error {
    color: var(--error-color);
  }
`;

export const NavHeader = styled.div`
  height: var(--nav-height);
  padding: 0 var(--padding-md);
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 1;
  background: var(--white);
  border-bottom: 1px solid var(--primary-color);
`;

export const AddForm = styled.form`
  & > div:not(:last-child) {
    margin-bottom: var(--margin-sm);
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--nav-height);
  height: calc(100vh - var(--nav-height));
  overflow: hidden;

  --sidebar-left-width: 200px;
  --sidebar-right-width: 500px;

  .sidebar-left {
    flex-basis: var(--sidebar-left-width);
    border-right: 1px solid var(--primary-color);
    padding: var(--padding-md);
  }

  .content {
    flex-basis: calc(100% - var(--sidebar-left-width) - var(--sidebar-right-width));
    padding: var(--padding-md);
    overflow: auto;
  }

  .sidebar-right {
    flex-basis: var(--sidebar-right-width);
    border-left: 1px solid var(--primary-color);
    padding: var(--padding-md);
    & {
      input {
        width: 100%;
      }
    }
  }
`;

export const ListItemWrapper = styled.div`
  margin: var(--padding-md);
  padding-bottom: var(--padding-md);
  border-bottom: 1px solid var(--primary-color);

  & > div:not(:last-child) {
    margin-bottom: var(--margin-sm);
  }

  & {
    input {
      width: 100%;
    }
  }
`;

export const Label = styled.div`
  flex-basis: 55px;
`;

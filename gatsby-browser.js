export const registerServiceWorker = () => true;

export const onServiceWorkerUpdateReady = () => {
  // console.log('This application has been updated', 'Reload to display the latest version')
  const answer = window.confirm(`This application has been updated.\nReload to display the latest version?`);

  if (answer === true) {
    window.location.reload();
  }
};

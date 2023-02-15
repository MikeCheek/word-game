exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  console.log('Page - ', page.path);
  if (page.path.match(/^\/code/)) {
    page.matchPath = '/code/*';

    createPage(page);
  }
};

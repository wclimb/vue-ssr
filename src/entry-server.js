import { createApp } from "./app";

const isDev = process.env.NODE_ENV !== "production";

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now();
    const { app, router, store, event } = createApp();

    const { url } = context;
    const { fullPath } = router.resolve(url).route;

    if (fullPath !== url) {
      return reject({ url: fullPath });
    }

    // set router's location
    router.push(url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      Promise.all(
        matchedComponents.map(
          ({ asyncData }) =>
            asyncData &&
            asyncData({
              store,
              route: router.currentRoute,
              event
            })
        )
      )
        .then(aData => {
          isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);
          // Object.assign(store.state, aData[0]);
          // context.state = event._data;
          context.state = store.state;
          context.head = "ssr page";
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};

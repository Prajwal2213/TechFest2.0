export const waitRender = (renderer, scene, camera, cb) => {
  let called = false;

  const check = () => {
    if (called) return;

    renderer.render(scene, camera);
    called = true;

    // let browser paint at least once
    requestAnimationFrame(() => {
      cb?.();
    });
  };

  // wait for GPU + RAF
  requestAnimationFrame(check);
};

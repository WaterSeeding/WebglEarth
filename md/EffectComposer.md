# EffectComposer

## RenderPass

RenderPass是一种渲染通道，用于将场景渲染到屏幕上。

在Three.js中进行渲染时，可以使用多个渲染通道（RenderPass）来创建复杂的渲染效果。每个RenderPass都代表了渲染场景的一部分，可以通过将多个RenderPass组合在一起来创建最终的渲染结果。

RenderPass本身并不进行任何特殊的后期处理，它仅仅是将场景渲染到一个缓冲区中。在渲染过程中，可以通过设置不同的相机、渲染目标和渲染顺序来配置RenderPass。

一旦所有的RenderPass都被执行完毕，可以使用EffectComposer将它们组合在一起，应用各种后期处理效果（如模糊、色彩校正等）。最终的结果将在屏幕上显示出来。

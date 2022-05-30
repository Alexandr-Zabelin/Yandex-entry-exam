/* eslint-disable no-plusplus */
function renderWaterfall(rootNode, columnCount, elementGap) {
  function applyGridStyles(gridContainer, columnCount, elementGap) {
    const containerStyle = gridContainer.style;

    containerStyle.display = 'grid';
    containerStyle.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
    containerStyle.gap = `${elementGap}px`;
    containerStyle.gridAutoRows = '1px';
  }

  function wrapItemElement(itemEl) {
    const wrappedItemEl = document.createElement('div');

    wrappedItemEl.append(itemEl.cloneNode(true));

    return wrappedItemEl;
  }

  function appendWrappedItems(parentEl) {
    const itemsElements = parentEl.children;
    const wrappedItemsElements = [];

    for (let i = 0; i < itemsElements.length; i++) {
      const wrappedItemEl = wrapItemElement(itemsElements[i]);

      wrappedItemsElements.push(wrappedItemEl);
    }

    parentEl.innerHTML = '';

    for (let i = 0; i < wrappedItemsElements.length; i++) {
      parentEl.append(wrappedItemsElements[i]);
    }
  }

  function applyRowSpan(gridContainer, wrappedItem) {
    const gridContainerStyles = window.getComputedStyle(gridContainer);
    const rowHeight = parseInt(gridContainerStyles.getPropertyValue('grid-auto-rows'), 10);
    const gridRowGap = parseInt(gridContainerStyles.getPropertyValue('grid-row-gap'), 10);
    const contentElHeight = wrappedItem.children[0].getBoundingClientRect().height;

    const wrappedItemRowSpan = Math.round(
      (contentElHeight + gridRowGap) / (rowHeight + gridRowGap)
    );

    wrappedItem.style.gridRowEnd = `span ${wrappedItemRowSpan}`;
  }

  function applyRowSpanForWrappedItems(gridContainer) {
    const wrappedItems = gridContainer.children;

    for (let i = 0; i < wrappedItems.length; i++) {
      applyRowSpan(gridContainer, wrappedItems[i]);
    }
  }

  applyGridStyles(rootNode, columnCount, elementGap);
  appendWrappedItems(rootNode);
  applyRowSpanForWrappedItems(rootNode);

  window.addEventListener('resize', () => {
    applyRowSpanForWrappedItems(rootNode);
  });
}

const rootEl = document.querySelector('.root');

renderWaterfall(rootEl, 3, 10);

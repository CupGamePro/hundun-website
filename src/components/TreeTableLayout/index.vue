<template>
  <div class="tree-table-box">
    <div class="tree-table-left">
      <PageCard style="height: 100%;">
        <slot name="tree"></slot>

      </PageCard>
    </div>
    <div class="tree-table-right">
      <slot name="filter"></slot>
      <PageCard style="min-height: calc(100vh - 200px);">
        <slot name="table"></slot>
      </PageCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tree-table-box {
  display: flex;
  min-height: calc(100vh - 200px);

  .tree-table-left {
    min-width: 200px;
    margin-right: 16px;
  }

  .tree-table-right {
    width: calc(100% - 200px);
  }
}
</style>
export default {
  // 提示框(Toast)
  toast: (title, icon = 'none', duration = 1500, mask = false) => {
    uni.showToast({
      title, // 提示内容(带有‘icon’时最好不要超过7个字，显示有问题)
      icon, // 图标
      duration, // 显示时间
      mask // 是否有蒙层
    })
  },

  // 设置 标题(title)
  setTitle(title) {
    uni.setNavigationBarTitle({ title })
  },

  // 模态框(modal)
  modal(modalData) {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title: modalData.title || '提示',
        content: modalData.content || '是否确定执行此操作？',
        confirmText: modalData.confirmText || '确认',
        confirmColor: modalData.confirmColor || '#576B95',
        showCancel: modalData.showCancel,
        cancelText: modalData.cancelText || '取消',
        cancelColor: modalData.cancelColor || '#000000',
        success: res => {
          if (!res.confirm) {
            reject();
            return;
          }
          resolve();
        }
      })
    })
  },

  // 加载框(loading)
  loading(title) {
    if (!title) {
      uni.hideLoading();
      return;
    }
    uni.showLoading({ title: title || '加载中...', mask: true });
  },

  // 拨打电话
  phoneCall(phone) {
    uni.makePhoneCall({ phoneNumber: phone })
  }
}

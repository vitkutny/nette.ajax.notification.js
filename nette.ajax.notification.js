(function (window, $, document, Notification) {
	$.nette.ext('notification', {
		init: function () {
			var notification = this;
			Notification.requestPermission(function (permission) {
				notification.permission = permission;
				notification.notify();
			});
		},
		success: function () {
			this.notify();
		}
	}, {
		timeout: 5000,
		permission: false,
		selector: '[data-notification]',
		icon: '/favicon.ico',
		notify: function () {
			var notification = $(this.selector);
			switch (this.permission) {
				case 'granted':
					var that = this;
					notification.hide().each(function () {
						var notification = $(this);
						var iconContainer = notification.find('[data-notification-icon]');
						var icon = iconContainer.data('notification-icon') || iconContainer.attr('href') || that.icon;
						var titleContainer = notification.find('[data-notification-title]');
						var title = titleContainer.data('notification-title') || titleContainer.html() || document.title;
						var bodyContainer = notification.find('[data-notification-body]');
						var body = bodyContainer.data('notification-body') || bodyContainer.html();
						var tag = notification.data('notification-tag') || body;
						var timeout = notification.data('notification') || that.timeout;
						notification = new Notification(title, {
							tag: tag,
							body: body,
							icon: icon
						});
						window.setTimeout(function () {
							notification.close();
						}, timeout);
					});
					break;
				default:
					notification.show();
					break;
			}
		}
	});
})(window, window.jQuery, document, Notification);

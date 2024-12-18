import { Problem } from '@/types/http-errors.interface';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { Notification } from '@/types/notification.interface';
import { pushToNotificationsStore } from '@/stores/notification.store';

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			// show notification
		},
	}),

	mutationCache: new MutationCache({
		onError: (error: unknown) => {
			// show notification
			showNotifications(error as Problem);
		},
	}),

	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			gcTime: 1000 * 60 * 60 * 24,
			throwOnError: false,
		},
	},
});

const showNotifications = (problem: Problem) => {
	const notifications: Omit<Notification, 'id'>[] = [];
	if (problem?.errors) {
		Object.entries(problem.errors).forEach(([_, values]) =>
			values.forEach((errorMessage) =>
				notifications.push({
					message: errorMessage,
					type: 'error',
				})
			)
		);
	} else if (problem?.detail) {
		notifications.push({
			message: problem.detail,
			type: 'error',
		});
	}

	pushToNotificationsStore(notifications);
};

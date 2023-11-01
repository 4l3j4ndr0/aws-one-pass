import { useQuasar } from "quasar";

export default function () {
  const $q = useQuasar();
  const showLoading = (message) => {
    $q.loading.show({
      message,
    });
  };

  const hideLoading = () => {
    $q.loading.hide();
  };

  const showNoty = (type, message, timeout = 5000) => {
    switch (type) {
      case "success":
        $q.notify({
          type: "positive",
          timeout,
          message,
          actions: [
            {
              color: "white",
              icon: "close",
            },
          ],
        });
        break;
      case "warning":
        $q.notify({
          type: "warning",
          message,
          timeout,
          textColor: "white",
          actions: [
            {
              color: "white",
              icon: "close",
            },
          ],
        });
        break;
      case "error":
        $q.notify({
          type: "negative",
          timeout,
          message,
          actions: [
            {
              color: "white",
              icon: "close",
            },
          ],
        });
        break;
      case "info":
        $q.notify({
          type: "info",
          timeout,
          message,
          actions: [
            {
              color: "white",
              icon: "close",
            },
          ],
        });
        break;
    }
  };

  return {
    showLoading,
    hideLoading,
    showNoty,
  };
}

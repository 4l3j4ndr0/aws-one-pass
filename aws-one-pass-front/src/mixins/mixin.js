import { useQuasar } from "quasar";
import { useGeneralStore } from "src/stores/general";
export default function () {
  const general = useGeneralStore();
  const $q = useQuasar();
  const showLoading = (message) => {
    if ($q.platform.is.bex) {
      general.setLoading({
        active: true,
        message,
      });
    } else {
      $q.loading.show({
        message,
      });
    }
  };

  const hideLoading = () => {
    if ($q.platform.is.bex) {
      general.setLoading({
        active: false,
        message: "Please wait...",
      });
    } else {
      $q.loading.hide();
    }
  };

  const showNoty = (type, message, timeout = 5000) => {
    switch (type) {
      case "success":
        $q.notify({
          type: "positive",
          position: "top-right",
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
          position: "top-right",
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
          position: "top-right",
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
          position: "top-right",
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

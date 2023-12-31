import InputButton from "../Button/InputButton";
import { Box, Typography } from "@mui/material";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";

const ViewNewCampaign = ({
  formData,
  handleFinalSubmit,
  handleEditProp,
  setFormData,
  imagePreview,
}) => {
  const handleEdit = () => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    setFormData(storedFormData);
    handleEditProp();
  };

  let offerLimit, customerLimit;

  if (formData.expiredByNumber) {
    offerLimit = `Offer is limited for ${formData.availableCodes} customers`;
  } else {
    offerLimit = "Offer is unlimited in number of customers";
  }

  if (formData.allowSuperCustomer && formData.allowNewCustomer) {
    customerLimit = "Super customers & New customers";
  } else if (formData.allowNewCustomer) {
    customerLimit = "New customers";
  } else if (formData.allowSuperCustomer) {
    customerLimit = "Super customers";
  }

  let imageSrc;
  if (formData.media) {
    if (Array.isArray(formData.media)) {
      imageSrc = formData.media[0];
    } else {
      imageSrc = formData.media;
    }
  } else {
    imageSrc = localStorage.getItem("media");
  }

  return (
    <div>
      <Box
        sx={{
          padding: {
            xs: "32px 16px",
            md: "44px 74px",
          },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/*  */}
        <Header>Review the campaign</Header>
        <Box
          sx={{
            marginTop: "24px",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-between",
            // alignItems: 'center',
            flexShrink: 0,
            display: "flex",
            gap: "24px",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              height: { xs: "356px", md: "400px" },
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <img
              src={imageSrc}
              alt="Campaign Image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "55%" },
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <SubHeader>{formData.name}</SubHeader>
            <Typography>{formData.type}</Typography>
            <Typography>
              Date: {new Date(formData.startDate).toISOString().slice(0, 10)} to{" "}
              {new Date(formData.endDate).toISOString().slice(0, 10)}
            </Typography>
            <Typography>{offerLimit}</Typography>
            <Typography>Offers: {formData.offer}</Typography>
            <Typography>Eligible customers: {customerLimit}</Typography>
            <Typography>
              Each ${formData.superCustomerPoints} spending by referred
              customers converts to 1 earning point for Super Customer to
              receive $1.00 discount
            </Typography>
            <Typography>Conditions: {formData.condition}</Typography>
            <Typography>{formData.description}</Typography>
            <InputButton
              onFirstButtonClick={handleEdit}
              onSecondButtonClick={handleFinalSubmit}
              firstButtonText="Edit"
              secondButtonText="Create"
              type="submit"
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ViewNewCampaign;

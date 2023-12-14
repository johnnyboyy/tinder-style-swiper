type CulturalMoment = {
	uuid: string;
	mainImage: string | null;
	title: string | null;
	subtitle: string | null;
	backImage: string | null;
	description: string | null;
	percentSelected: number | null;
};

type CulturalMomentSelection = {
	uuid: string;
	userUuid: string | null;
	selectedCulturalMoments: string[];
	mixpanelId: string | null;
	publicId: string | null;
};

export type { CulturalMoment, CulturalMomentSelection };

struct Move
{
    int fromRow,fromCol;
    int toRow,toCol;
    char promotion;
    Move(int fr,int fc,int tr,int tc,char promo = '.')
        :fromRow(fr),fromCol(fc),toRow(tr),toCol(tc),promotion(promo){}
};

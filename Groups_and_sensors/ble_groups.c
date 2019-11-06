#include<stdlib.h>
#include<stdio.h>
#include<string.h>
#include<math.h>
void removeAll(char * str, const char * toRemove);
int countrows=0;

#define BUFFER_SIZE 1000
 

int main(){
   int n;
   //int counter=0;
   char name[10];
   printf("Press 1 to add a device\n");
   printf("Press 0 to remove a device\n");
   printf("Press 9 to show devices and exit\n");
   abc: printf("Enter choice\n");
   scanf("%d",&n);
   
   FILE *dc;
   dc = fopen("devices_count.txt", "a+");
   int counter=getw(dc);


 if(n==1)
  {
	printf("enter the name of your device\n");
	if(scanf("%s",&name))
        {
         FILE *fp;
         char SensorsName[255];
         char tempName[20];

         fp= fopen("Devices.txt", "a+");
         fputs(name, fp);
         fputs("\n", fp);
	 ++counter;
	// putw(counter, fp);
         fclose(fp);
         }
         goto abc;  
  }
  else if(n==0 && counter == 0)
  {
    printf("No devices there to remove\n");
    counter=0;
    goto abc;
  }
  else if(n==0 && counter!=0)
  {
    FILE * fptr;  
    FILE * fTemp;

    char path[100]; 
    char toRemove[100];
    char buffer[1000];

    printf("Enter device name to be removed:\n");
    scanf("%s", toRemove);

    fptr = fopen("Devices.txt","a+"); 
    fTemp = fopen("temp.txt", "a+");

	if(fptr == NULL || fTemp == NULL)
	{
 		printf("\nUnable to open file\n");
 		exit(EXIT_SUCCESS);
	}

	while ((fgets(buffer, BUFFER_SIZE, fptr))!=NULL)
	{
 		removeAll(buffer, toRemove);
		fputs(buffer, fTemp);
 	}

 	fclose(fptr);
	fclose(fTemp);

	remove("Devices.txt");
	rename("temp.txt", "Devices.txt");
//}
        --counter;
        goto abc;  
  }

  else if(n==9)
  {
  putw(counter,dc);
  fclose(dc);
  char *line_buf = NULL;
  size_t line_buf_size = 0;
  int line_count = 0;
  ssize_t line_size;
  FILE * fp = fopen("Devices.txt", "r");
  int c=getw(fp);
  line_size = getline(&line_buf, &line_buf_size, fp);
  printf("The connected devices are:\n");

	while(line_size>=0)
	{

   	line_count++;
 	printf("%s", line_buf);
 	line_size = getline(&line_buf, &line_buf_size, fp);

	}
  
  FILE *DC1 = fopen("devices_count.txt", "a+");
  FILE *DC2 = fopen("temp1.txt", "a+");
  putw(counter, DC2);
  remove("devices_count.txt");
  rename("temp1.txt", "devices_count.txt");
  
  fclose(DC1);
  fclose(DC2);

  DC1 = fopen("devices_count.txt", "r");
  int number = getw(DC1);

  printf("No. of connected devices are: %d\n", number);
  return 0;

  }
}



void removeAll(char *str, const char * toRemove)
{
	printf("HEELLOO TEST");
 int i,j, stringLen, toRemoveLen;
 int found;

 stringLen = strlen(str);
 toRemoveLen = strlen(toRemove);
 for(i=0; i<=stringLen-toRemoveLen; i++)
  {
   found=1;
 	for(j=0; j < toRemoveLen; j++)
 	{
  		if(str[i+j] != toRemove[j])
  		{
   		 found = 0;
   		 break;
  		}
	}
 	if( found == 1)
 	{
  	  for(j=i; j<= stringLen - toRemoveLen; j++)
  	  {
		str[j] = str[j + toRemoveLen]; 
        }
	 		 i--;
        }
   } 
 }


